# Egg Talk

<b>Temporary Server URL</b> `https://egg-talk-server.run.goorm.io`  
<b>Chat</b> [Try it](https://egg-talk-server.run.goorm.io/chat/room/)

---

- [회원가입](#회원가입)  
- [로그인](#로그인)  
- [유저 정보 불러오기](#유저-정보-불러오기)  
- [유저 정보 수정하기](#유저-정보-수정하기)  

- [채팅방 생성하기](#채팅방-생성하기)
- [채팅방 목록 가져오기](#채팅방-목록-가져오기)
- [채팅방의 채팅들 불러오기](#채팅방의-채팅들-불러오기)
---

### 회원가입 
| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/user` | `False` |

- 아이디, 비밀번호, 이름으로 간단한 회원가입 가능.  
- 비밀번호는 영문자, 숫자를 각각 포함한 8~20자의 문자열이어야 함.  



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

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/auth` | `True` |

- 아이디와 비밀번호를 통해 토큰을 발급받음.

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

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/user` | `True` |

- 헤더에 토큰값을 추가해서 요청하면 서버에서는 토큰을 통해 사용자의 정보를 응답한다.
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

--- 

### 유저 정보 수정하기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `PUT` | `/user` | `True` |

- 비밀번호, 유저이름, 이메일을 수정할 수 있다.

#### Requset body
```javascript
{
    "password": user_password,
    "username": user_name,
    "email": user_email
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

---

### 채팅방 목록 가져오기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/chat/room` | `Optional` |

- 헤더에 토큰이 있다면 토큰을 기반으로 특정 유저가 가지고 있는 채팅방 목록을 가져옴.
- 토큰으로 유저를 찾는 데 실패하거나 토큰이 없다면 모든 채팅방 목록을 가져옴.



#### Requset Header
1. 특정 유저의 채팅방 목록 반환
```javascript
{
    ...
    "Authorization": "Bearer " + $token
}
```
2. 모든 채팅방 목록 반환
```javascript
null
```

#### Response body
```javascript
//test value
[
    {
        "createdDate": "2022-10-04T13:38:50",
        "modifiedDate": "2022-10-04T13:38:50",
        "roomId": 10,
        "creatorId": "test32",
        "roomName": "testterdf"
    },
    {
        "createdDate": "2022-10-04T13:53:51",
        "modifiedDate": "2022-10-04T13:53:51",
        "roomId": 11,
        "creatorId": "test32",
        "roomName": "testterdf"
    }
]
```
---

### 채팅방 생성하기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/chat/room` | `True` |

- 방 제목을 통해 채팅방을 생성한다.

#### Request body
```javascript
{
    "roomName" : "My room!"
}
```
#### Response body
```javascript
{
    "creatorId": "test32",
    "roomName": "My room!",
    "userDtoSet": null
}
```

---

### 채팅방의 채팅들 불러오기

| Method | Url | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/chat/room/{roomId}` | `False yet` |

- 방 아이디를 통해 채팅 메세지들을 불러온다.

#### URL
`.../chat/room/5`

#### Response body

```javascript
//test value
[
    {
        "createdDate": "2022-10-04T12:42:40",
        "modifiedDate": "2022-10-04T12:42:40",
        "id": 20,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T12:42:43",
        "modifiedDate": "2022-10-04T12:42:43",
        "id": 21,
        "messageType": 1,
        "roomId": 5,
        "sender": "test32",
        "message": "ASDASDASD"
    },
    {
        "createdDate": "2022-10-04T13:17:28",
        "modifiedDate": "2022-10-04T13:17:28",
        "id": 22,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T13:17:31",
        "modifiedDate": "2022-10-04T13:17:31",
        "id": 23,
        "messageType": 1,
        "roomId": 5,
        "sender": "test32",
        "message": "asdasdasd"
    },
    {
        "createdDate": "2022-10-04T13:19:13",
        "modifiedDate": "2022-10-04T13:19:13",
        "id": 24,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    },
    {
        "createdDate": "2022-10-04T13:36:58",
        "modifiedDate": "2022-10-04T13:36:58",
        "id": 25,
        "messageType": 0,
        "roomId": 5,
        "sender": "test32",
        "message": "test32님이 입장하였습니다."
    }
]
```

---

그리고 웹소켓 예시 코드...  

`/src/main/resources/templates/roomdetail.html`
[Link](https://github.com/ckdhkdwns/egg-talk/blob/api/eggtalk/src/main/resources/templates/roomdetail.html)


## Versions

- <b>node.js</b> 16.17.1
- <b>jdk</b> 17.0.4 (openjdk)
- <b>springboot</b> 2.7.4

## Plan

