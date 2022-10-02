# Egg Talk

<b>Temporary Server URL</b> `https://egg-talk-server.run.goorm.io`

## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4


## Table of APIs
- [회원가입](#회원가입)  
- [로그인](#로그인)  
- [유저 정보 불러오기](#유저-정보-불러오기)  
- [유저 정보 수정하기](#유저-정보-수정하기)  

---

### 회원가입 
| Method | Url |
|:---:|:---:|
| `POST` | `/user` | 

- 아이디, 비밀번호, 이름으로 간단한 회원가입 가능.  
- 비밀번호는 영문자, 숫자를 각각 포함한 8~20자의 문자열이어야 함.  


| Response Code | Meaning |
|:---:|:---|
| `200` | 회원 등록 성공 | 
| `400` | 비밀번호가 유효하지 않음 | 
| `409` | 이미 존재하는 회원 |

#### Request body
```bash
{
    "userId": user_id,
    "password": user_password,
    "username": user_name,
    "gender": user_gender,
    "email: user_email
}
```
#### Response body

```javascript
{
    "userId": user_id,
    "username": user_name,
    "gender": user_gender,
    "email": user_email
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```
---

### 로그인

| Method | Url |
|:---:|:---:|
| `POST` | `/auth` | 

아이디와 비밀번호를 통해 토큰을 발급받음.

| Response Code | Meaning |
|:---:|:---|
| `200` | 로그인 성공 | 
| `401` | 로그인 실패 | 
#### Request body
```javascript
{
    "userId": user_id,
    "password": user_password,
}
```

#### Response body
```javascript
{
    "token": token_value
}
```
---

### 유저 정보 불러오기
<b>GET</b> `/user`
| Method | Url |
|:---:|:---:|
| `GET` | `/user` | 

헤더에 토큰값을 추가해서 요청하면 서버에서는 토큰을 통해 사용자의 정보를 응답한다.
#### Requset header
```javascript
{
    ...
    "Authorization": "Bearer " + $token
}
```

#### Response body
```javascript
{
    "userId": user_id,
    "username": user_name,
    "gender": user_gender,
    "email": user_email
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```

### 유저 정보 수정하기

| Method | Url |
|:---:|:---:|
| `PuT` | `/user` | 

비밀번호, 유저이름, 이메일을 수정할 수 있다.

#### Requset body
```javascript
{
    "password": "1q2w3e4r",
    "username": "updatedName",
    "email": "updatedEmai2l"
}
```

#### Response body
```javascript
{
    "userId": user_id,
    "username": updated_user_name,
    "gender": user_gender,
    "email": updated_user_email,
    "authorityDtoSet": [
        {
            "authorityName": user_authority //유저의 권한 (ADMIN_USER: 관리자, ROLE_USER: 일반 유저)
        }
    ]
}
```
## Plan

~~1. DB서버(mysql) 외부로 분리 (AWS나 구름 컨테이너?)~~  
2. 프로필 출력, 웹소켓 구현
