import axios from "axios";


/*---Вспомогательная функция, которая позволяет создать отдельный экземпляр настроек с url-адресом,
 ключом доступа и разрешение на запрос с другого url для работы с нашей API---*/
let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "a78224e4-f36a-4973-8a7c-cd8a0ee10740"
    }
})

/*---Интерфейс взаимодействия с сервером---*/
export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        /*---Запрос на сервер за списком пользователей, с query-параметрами,
        номером страницы и количеством пользователей---*/
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`)
    },
    getUserProfile(userId: string) {
        /*---Запрос на сервер за профилем конкретного пользователя, используя userId, как id пользователя---*/
        console.warn('..please use method from @profileAPI.getUserProfile@')
        return profileAPI.getUserProfile(userId);
    },
    follow(userId: number) {
        /*---Запрос на сервер, запрашивающий подписку на конкретного пользователя---*/
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        /*---Запрос на сервер, запрашивающий отписку от конкретного пользователя---*/
        return instance.delete(`follow/${userId}`)
    }
}


export const usersAuth = {
    authMe() {
        /*---Запрос на сервер за авторизацией---*/
        return instance.get(`auth/me`)
    }
}

export const profileAPI = {
    getUserProfile(userId: string) {
        /*---Запрос на сервер за профилем конкретного пользователя, используя userId, как id пользователя---*/
        return instance.get(`profile/` + userId)
    },
    getStatusUser(userId: string) {
        /*---Запрос на сервер за статусом в профиле конкретного пользователя---*/
        return instance.get(`profile/status/${userId}`)
    },
    updateStatusUser(status: string) {
        /*---Запрос на сервер за изменением статуса в моем профиле---*/
        return instance.put(`profile/status`, {status: status})
    }
}