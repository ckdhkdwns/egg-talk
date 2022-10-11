# Egg Talk

> Temporary Server URL `https://egg-talk-server.run.goorm.io`  


## Table of content

- [DB Model](#db-model)
- [Data types](#data-types)
- `.../auth`
    - [로그인](#로그인)  
    - [현재 유저 정보 불러오기](#현재-유저-정보-가져오기)  
- `.../users`
    - [회원가입](#회원가입)  
    - [유저 정보 수정하기](#유저-정보-수정하기)  
    - [유저가 접속해있는 채팅방 리스트 가져오기](#유저가-접속해있는-채팅방-리스트-가져오기)
    - [특정 유저 정보 가져오기](#특정-유저-정보-가져오기)
- `.../rooms`
    - [채팅방 생성하기](#채팅방-생성하기)
    - [모든 채팅방 목록 가져오기](#모든-채팅방-목록-가져오기)
    - [채팅방 내의 메세지 리스트 가져오기](#채팅방-내의-메세지-리스트-가져오기)
    - [채팅방 내의 유저 리스트 가져오기](#채팅방에-접속해-있는-유저-리스트-가져오기)
- `Client`
    - [Initalize](#initalize)
    - [Connect](#connect)
    - [Subscribe](#subscribe)
    - [Publish](#publish)
    - [Disconnect](#disconnect)
- [Versions](#versions)

## DB model
친구관계를 위한 테이블들과 채팅기능을 위한 테이블들로 나뉜다.
![db](https://user-images.githubusercontent.com/66898263/195126217-01054cb9-0cb9-40e1-b0ac-f718107ad9d0.svg)


## Usage

### Data Types
각 컬럼들의 데이터 타입이다. 
| Column | Data type | Minimum length | Maximum length |
|:---:|:---:|:---:|:---:|
| `username` | `String` | `3 ` |  `50 ` |
| `password` | `String` | `8 ` |  `100 ` |
| `displayname` | `String` | `3` | `50` |
| `gender` | `Boolean` | `1 ` |  `1 ` |
| `email` | `String` | `5 ` |  `50 ` |
| `roomId` | `Integer` | `1 ` |  `11 ` |
| `roomName` | `String` | `5 ` |  `50 ` |
| `messageType` | `Integer` | `1 ` |  `1 ` |
| `content` | `String` | `1 ` |  `1000 ` |


### 로그인
아이디와 비밀번호를 통해 토큰을 발급받음.

####  Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/auth` | `False` |

#### Request
```json
{
    "userId": "ckdhkdwns",
    "password": "1q2w3e4r",
}
```

#### Response
```json
{
    "token": "token_value"
}
```

<br/><br/>

### 현재 유저 정보 가져오기
헤더의 토큰에 담긴 유저의 정보를 가져온다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/auth/me` | `True` |

#### Request 
```javascript
//skip
```

#### Response
```json
{
    "username": "zhdqks",
    "displayname": "차왕준",
    "gender": true,
    "email": "test2@test.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 회원가입 
`username`, `password`, `gender`, `email`을 통해 가입한다.
#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/users` | `False` |

#### Request
```json
{
    "username": "zhdqks",
    "displayname": "차왕준",
    "password": "1q2w3e4r",
    "email": "test2@test.com",
    "gender": true
}
```
#### Response

```json
{
    "username": "zhdqks",
    "displayname": "차왕준",
    "gender": true,
    "email": "test2@test.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 특정 유저 정보 가져오기

`username`에 해당하는 유저의 정보를 가져온다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{username}` | `True` |

#### Example URL

`.../users/zhdqks`

#### Response
```json
{
    "username": "zhdqks",
    "displayname": "차왕준",
    "gender": true,
    "email": "test2@test.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>


### 유저 정보 수정하기
- URL의 `username`과 토큰의 `username`이 일치하면 해당 아이디의 유저 정보를 수정함.
- 비밀번호, 이메일을 수정할 수 있다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `PUT` | `/users/{username}` | `True` |

#### Requset
```json
{
    "displayname": "차킹준",
    "password": "1q2w3e4r",
    "email": "zhdqks1@naver.com"
}
```

#### Response
```json
{
    "username": "zhdqks",
    "displayname": "차킹준",
    "gender": true,
    "email": "zhdqks1@naver.com",
    "authorityDtoSet": [
        {
            "authorityName": "ROLE_USER"
        }
    ]
}
```
<br/><br/>

### 모든 채팅방 목록 가져오기
모든 채팅방 목록을 가져옴

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms` | `True` |



#### Request
```javascript
//skip
```
#### Response
```json
[
    {
        "createdDate": "2022-10-09T14:17:44",
        "roomId": 3,
        "roomName": "차왕준의 롤토체스"
    },
    {
        "createdDate": "2022-10-09T14:16:39",
        "roomId": 2,
        "roomName": "hello123"
    },
    {
        "createdDate": "2022-10-09T14:15:39",
        "roomId": 1,
        "roomName": "hello123"
    }
]
```
<br/><br/>

### 유저가 접속해있는 채팅방 리스트 가져오기
URL의 `username`과 토큰의 `username`이 일치하면 해당 아이디의 유저 정보를 가져옴.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/users/{username}/rooms` | `True` |

#### Example URL

`.../users/ckdhkdwns/rooms`

#### Response
```json
[
    {
        "createdDate": "2022-10-09T14:16:39",
        "roomId": 2,
        "roomName": "hello123"
    },
    {
        "createdDate": "2022-10-09T14:17:44",
        "roomId": 3,
        "roomName": "차왕준의 롤토체스"
    }
]
```
<br/><br/>

### 채팅방 생성하기

채팅방을 생성한다.

#### Info
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `POST` | `/rooms` | `True` |

#### Request
```json
{
    "roomName" : "My room!"
}
```
#### Response
```json
{
    "createdDate": "2022-10-10T04:50:10.515197183",
    "roomId": 6,
    "roomName": "My room!"
}
```
<br/><br/>

### 채팅방 내의 메세지 리스트 가져오기

| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms/{roomId}/messages` | `True` |

- 방 아이디를 통해 채팅 메세지들을 불러온다.

#### Example URL
`.../rooms/6/messages`

#### Response
```json
[
    {
        "displayname": "차왕준",
        "roomId": 6,
        "messageType": 0,
        "content": "차왕준님이 입장하였습니다.",
        "createdDate": "2022-10-11T09:49:30"
    },
]
```
<br/><br/>

### 채팅방에 접속해 있는 유저 리스트 가져오기
| Method | URL | Token Necessity |
|:---:|:---:|:---:|
| `GET` | `/rooms/{roomId}/users` | `True` |
- 채팅방에 접속해 있는 유저의 정보들을 가져온다.

#### Example URL
`.../rooms/3/users`

#### Response
```json
[
    {
        "createdDate": "2022-10-11T09:31:48",
        "username": "zhdqks",
        "displayname": "차킹준",
        "gender": true,
        "email": "zhdqks1@naver.com"
    },
    {
        "createdDate": "2022-10-09T14:47:36",
        "username": "juyeolyoon",
        "displayname": "주열",
        "gender": false,
        "email": "different"
    },
]
```


## 채팅
> Refer to `stompjs@6.1.2` API docs [Link](https://stomp-js.github.io/api-docs/latest/index.html)
### Initalize
`client`를 지정한다.
```javascript
let client = Stomp.over(function () {
    return new SockJs(API_URL + '/chat')
});
```

### Connect
토큰과 함께 서버에 연결한다.
```javascript
client.connect({ Authorization: token }, (data) => {
    /*
    client.publish({
        destination: "/pub/message",
        headers: { Authorization: token },
        body: JSON.stringify({
            messageType: 0,
            roomId: roomId
        })
    });
    */
});
```
### Subscribe
`roomId`에 해당하는 방에서 생성되는 메세지들을 모두 실시간으로 받아온다.
```javascript
client.subscribe('/sub/chat/room/' + roomId, (message) => {
    const recv = JSON.parse(message.body);
    setMessage(prev => [...prev, recv])
});
```

### Publish
토큰과 함께 메세지를 보낸다.

|Message Type|Value|Content Necessity |
|:---:|:---:|:---:|
|`0`| 입장 메세지| `False`|
|`1`| 일반 메세지| `True`|
|`2`| 퇴장 메세지| `False`|

```javascript
client.publish({
    destination: "/pub/message",
    headers: { Authorization: token },
    body: JSON.stringify({
        messageType: 0,
        roomId: roomId
        content: content
    })
});
```


### Disconnect
`messageType: 2` 인 메세지를 보냄으로써 서버에 연결을 종료함을 알리고 연결을 끊는다.
```javascript
client.publish(
    destination: "/pub/message", 
    headers: { Authorization: data.token },
    body: JSON.stringify({
        messageType: 2,
        roomId: data.roomId,    
    })
);
client.disconnect();
```



## Versions
| Item | Version |
|:---:|:---:|
|`node.js`|`16.17.1`|
|`jdk`|`17.0.4`|
|`spring boot`|`2.7.4`|
|`@stomp/stompjs`|`6.1.2`|


