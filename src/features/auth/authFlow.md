```mermaid
sequenceDiagram
  Client->>+Server: Login (username / email, password)
  Server-->>-Client: Access Token + Set HttpOnly Cookie
  Client->>+Server: API Request (with Access Token)
  Server-->>-Client: 401 Unauthorized (if expired)
  Client->>+Server: /refresh-token (auto cookie)
  Server-->>-Client: New Access Token
  Client->>+Server: Retry Original Request
  ```