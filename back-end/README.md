# GroovId19 - Back end

## Prerequisites

For development, you need:

- [Java 13](https://openjdk.java.net/projects/jdk/13/)

## Running tests

Execute `./mvnw verify` to run the tests and create a JAR locally.

## Running the app

Execute `./mvnw package -Dmaven.test.skip` to build a JAR locally.
Run the app by executing `java -jar target/<NAME_OF_JAR>.jar`.

## Docker

Build a Docker image by executing `docker build -t groovid19-back-end-deploy -f back-end/dockerfiles/deploy/Dockerfile .`.
Run the app in a Docker container by executing `docker run --rm -itd -p3003:3003 -t groovid19-back-end-deploy`.

## Code formatting

Follow these steps in IntelliJ to ensure all code is formatted consistently:

- Preferences > Editor > Code Style > Java
- Import `intellij_code_style_scheme.xml` found in the root of this repository as Intellij IDEA code style XML using the cogwheel button to the right of the current scheme.
- Configure a macro to automatically format the code on save
  - Edit > Macro > Start Macro Recording
  - Perform the following actions
    - Code > Reformat Code
    - Code > Optimize imports
    - File > Save All
  - Edit > Macro > Stop Macro Recording and save the macro as "FormatAndSave"
  - Preferences > Keymap > Macros > FormatAndSave > Add Keyboard Shortcut
  - Trigger the macro FormatAndSave with the keys normally used to save all files.
    E.g. on Mac that's Command + S, on Windows Alt + S.
    This way your code is automatically formatted correctly when you save.
    You might be asked to remove the existing shortcut to save all files.
- Disable "Optimize imports on the fly"
  - Preferences > Editor > General > Auto Import > Java > Uncheck "Optimize imports on the fly"
- Collapse imports of the same package
  - Preferences > Editor > Code Style > Java > Imports tab, configure as follows:
    - "Class count to use import with '\*'" -> 3
    - "Names count to use static import with '\*'" -> 3
