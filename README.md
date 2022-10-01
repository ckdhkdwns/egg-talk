# Egg Talk
This branch is for API server.

## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

## Usage

<b>Server URL</b> `https://egg-talk-server.run.goorm.io`

### 회원가입 
<b>POST</b> `/api/signup`  
아이디, 비밀번호, 이름으로 간단한 회원가입

#### Request body
```json
{
    "username": "user_id",
    "password": "user_password",
    "nickname": "user_name"
}
```
#### Response body

```javascript
{
    "username": "user_id",
    "nickname": "user_name",
    "authorityDtoSet": [
        {
            "authorityName": "user_authority" //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```
---

### 로그인
<b>POST</b> `/api/authenticate`  
아이디와 비밀번호를 통해 토큰을 발급받음. 이후 서버에 요청을 보낼 때 토큰을 요청 본문(Request Body)에 삽입하여 권한 인증 가능.
#### Request body
```json
{
    "username": "user_id",
    "password": "user_password",
}
```

#### Response body
```json
{
    "token": "token_value"
}
```

## Plan

1. DB서버(mysql) 외부로 분리 (AWS나 구름 컨테이너?)
2. 프로필 출력, 웹소켓 구현
