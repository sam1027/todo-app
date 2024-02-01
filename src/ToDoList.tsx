import { useState } from 'react';
import { useForm } from 'react-hook-form';

/* function ToDoList() {
    const [todo, setTodo] = useState("");
    const onChange = (e:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = e;
        setTodo(value);
    };
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(todo);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Write todo" value={todo} onChange={onChange}/>
                <button>Add</button>
            </form>
        </div>
    );
} */

interface IForm {
    email?: string,
    name?: string,
    address?: string,
    password?: string,
    password2?: string,
    extraError?: string,
}

function ToDoList() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        }
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password2) {
            setError(
                'password2'
                , { message: "Passwords are not same!" }
                , { shouldFocus: true }
            );
        }

        setError(
            'extraError'
            , { message: "Server is Shutdowned." }
        )
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onValid)}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <input placeholder="Email" {...register("email", { required: "Required!", pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Email wasn't follow the Rule!" }, })} />
                <span>{errors?.email?.message}</span>
                <input placeholder="name" {...register("name", { required: "Required!", minLength: { value: 10, message: "name is must longer than 10." }, validate: {
                    noYse: (value) => value?.includes("yse") ? "no yse allowed" : true,
                    noNico: (value) => value?.includes("nico") ? "no nico allowed" : true,
                } })} />
                <span>{errors?.name?.message}</span>
                <input placeholder="address" {...register("address", { required: "Required!" })} />
                <span>{errors?.address?.message}</span>
                <input placeholder="password" {...register("password", { required: "Required!", minLength: { value: 5, message: "password is must longer than 5." } })} />
                <span>{errors?.password?.message}</span>
                <input placeholder="password2" {...register("password2", { required: "Required!", minLength: { value: 5, message: "password2 is must longer than 5." } })} />
                <span>{errors?.password2?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}

export default ToDoList;