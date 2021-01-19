import React, {ChangeEvent} from "react";

/*---Типизация компоненты - DescriptionStatus---*/
interface IDescriptionStatus {
    status: string
    updateStatusUser: (status: string) => void
}

/*---Комопнента отображения статуса с переключением в режим редактирования и обратно---*/
export class DescriptionStatusClass extends React.Component<IDescriptionStatus, any> {

/*---Локальный стейт управлением отображения статуса---*/
    state = {
        editMode: false,
        status: this.props.status
    }

/*---Активируем мод редактирования статуса---*/
    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
    }

/*---Выключаем редактирование статуса и отображаем текст статуса---*/
    deactivatedEditMode() {
        this.setState({
            editMode: false
        })
        this.props.updateStatusUser(this.state.status);
    }

/*---Обновляет текст в поле ввода статуса, и сохраняет значение в локальный стейт---*/
    updateStatusValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

/*---Метод жизненного цикла компоненты, который следит за обновлением компоненты, и если значение изменяется, компонента перерисовывается,
также отвечает за синхронизацию данных из пропсов с данными с сервера---*/
    componentDidUpdate(prevProps: Readonly<IDescriptionStatus>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
/*---Если эдитМод активирован, то отображаем поле с редактированием текста, иначе покажем текст статуса---*/
        return <div>
            {
                !this.state.editMode ? <span onDoubleClick={this.activatedEditMode}>{this.props.status}</span>
                    :
                    <input type="text" autoFocus onBlur={this.deactivatedEditMode.bind(this)} value={this.state.status}
                           onChange={this.updateStatusValue}/>
            }
        </div>
    }
}