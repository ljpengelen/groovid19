import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as cuid from 'cuid';
import { empty, Observable, of } from 'rxjs';
import { concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import * as EventBus from 'vertx3-eventbus-client';
import {
  setIsSynchronizing,
  startSynchronizing,
  stopSynchronizing
} from '../groove-box/groove-box.actions';
import { GrooveBoxState } from '../groove-box/groove-box.reducer';

@Injectable()
export class SynchronizerEffects {
  id = cuid();
  eventBus: EventBus.EventBus;
  isConnected = false;

  connect$ = () =>
    new Observable<Action>((subscriber) => {
      console.log('Opening connection to event bus');
      this.eventBus = new EventBus('http://localhost:3003/eventBus');

      this.eventBus.onopen = () => {
        console.log('Connection to event bus is opened');

        this.eventBus.registerHandler(
          'clientsToClients.abc',
          {},
          (error, message) => {
            if (error) {
              console.error('Error occurred while receiving event', error);
              return;
            }

            if (message.body.sender == this.id) {
              console.log('Received self-sent message');
              return;
            }

            const action = {
              ...message.body.action,
              isExternal: true
            };
            console.log('Received external action', action);
            subscriber.next(action);
          }
        );

        this.isConnected = true;
        subscriber.next(setIsSynchronizing({ isSynchronizing: true }));
      };

      this.eventBus.onclose = () => {
        console.log('Connection to event bus is closed');
        this.isConnected = false;
        subscriber.next(setIsSynchronizing({ isSynchronizing: false }));
        subscriber.complete();
      };
    });

  restartSynchronizing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select('grooveBox', 'isSynchronizing'))
        )
      ),
      concatMap((actions) => {
        const isSynchronizing = actions[1];
        if (isSynchronizing) {
          return this.connect$();
        } else {
          return empty();
        }
      })
    )
  );

  startSynchronizing$ = createEffect(() =>
    this.actions$.pipe(ofType(startSynchronizing), concatMap(this.connect$))
  );

  stopSynchronizing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stopSynchronizing),
      map((action) => {
        console.log('Closing connection to event bus');
        if (this.eventBus) {
          this.eventBus.close();
          this.eventBus = null;
          this.isConnected = false;
        } else {
          console.log('Connection to event bus was already closed');
          return setIsSynchronizing({ isSynchronizing: false });
        }
      }),
      filter((action) => !!action)
    )
  );

  forward$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((action) => {
          if (this.isConnected && !(action as any).isExternal) {
            console.log('Forwarding', action);
            this.eventBus.publish(
              'clientsToClients.abc',
              { sender: this.id, action },
              {}
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{
      grooveBox: GrooveBoxState;
    }>
  ) {}
}
