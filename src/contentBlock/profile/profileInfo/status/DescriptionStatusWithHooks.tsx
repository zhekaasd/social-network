import React, {ChangeEvent, useEffect, useState} from "react";

/*---Типизация входящих пропсов компоненты - DescriptionStatus---*/
type DescriptionStatusWithHooksType = {
    status: string
    updateStatusUser: (status: string) => void
}

/*---Комопнента отображения статуса с переключением в режим редактирования и обратно---*/
export const DescriptionStatusWithHooks: React.FC<DescriptionStatusWithHooksType> = (props) => {



/*---Локальный стейт с переключением состояния статуса, иницилизационное значение выкл.---*/
    const [editMode, setEditMode] = useState<boolean>(false);
/*---Локальный стейт отображения актуальных данных статуса и его изменение---*/
    const [status, setStatus] = useState<string>(props.status);


/*---Хук, который следит за обновлением компоненты, и если значение изменяется, компонента перерисовывается,
также отвечает за синхронизацию данных из пропсов с данными с сервера---*/
    useEffect(() => {
        setStatus(props.status);
    }, [props.status])


/*---Активируем мод редактирования статуса---*/
    const activatedEditMode = () => {
        setEditMode(true)
    }

/*---Выключаем редактирование статуса и отображаем текст статуса---*/
    function deactivatedEditMode() {
        setEditMode(false);
        props.updateStatusUser(status);
    }

/*---Обновляет текст в поле ввода статуса, и сохраняет значение в локальный стейт---*/
    const updateStatusValue = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value);
    }


/*---Если эдитМод активирован, то отображаем поле с редактированием текста, иначе покажем текст статуса---*/
        return <div>
            {
                !editMode ? <span onDoubleClick={activatedEditMode}>{props.status}</span>
                    :
                    <input type="text" autoFocus onBlur={deactivatedEditMode} value={status}
                           onChange={updateStatusValue}/>
            }
        </div>
}