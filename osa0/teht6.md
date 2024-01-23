```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{content: "delulu is solulu", date: "2024-01-23T18:58:26.453Z"}, ... ]
    deactivate server
```
