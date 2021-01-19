import {InitialStateUsersItemType} from "../redux/users-reducer";


/*---Функция, которая будет универсальной для всех редьюсеров, пробигаться по массиву, искать нужные совпадения и
менять данные в этом массиве имьютабильно---*/
export const updateObjectInArray = (users: Array<InitialStateUsersItemType>, objectUserId: any, newObj = {}, objPropName: any) => {
    return users.map( (u: any) => {
        if (u[objPropName] === objectUserId) {
            return {...u, ...newObj}
        }
        return u;
    })
}