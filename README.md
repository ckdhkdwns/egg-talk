# Egg Talk
This branch is for API server.

## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

## Usage

1. 로컬에 Mysql 서버 켜기
```bash
service mysql start
```

2. `/egg-talk/eggtalk/src/main/java/eggtalk/eggtalk/EggtalkApplication.java` 경로의 `EggtalkApplication.java` 실행



<b>POST</b> `/api/signup`

#### Request body
```json
{
    "username": "user_id",
    "password": "user_password",
    "nickname": "user_name"
}
```
#### Response body

```json
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
<b>POST</b> `/api/authenticate`

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

---

## Plan

1. DB서버(mysql) 외부로 분리 (AWS나 구름 컨테이너?)
2. 프로필 출력, 웹소켓 구현