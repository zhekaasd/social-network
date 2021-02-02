/*--- Типизация компоненты - Contacts ---*/
import React from "react";

/*---Типизация компоненты - ContactsType---*/
type ContactsType = {
    nameLink: string
    valueLink: string
}

/*--- Компонента отображения контактных данных профиля ---*/
export const Contacts: React.FC<ContactsType> = ({nameLink, valueLink}) => {
    return <div>
        <span><b>{nameLink}</b>: {(valueLink === '' || valueLink === null) ? '-----------------' : valueLink}</span>

    </div>
}