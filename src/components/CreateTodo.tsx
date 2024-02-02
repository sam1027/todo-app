import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, todoState } from '../atoms';

interface IForm{
    todo: string;
}

function CreateTodo() {
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const setTodos = useSetRecoilState(todoState);
    const category = useRecoilValue(categoryState);
    const onSubmit = ({todo}:IForm) => {
        setTodos(oldTodos => [{id: Date.now(), text: todo, category: category}, ...oldTodos]);
        setValue("todo", "")
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Write todo" 
                {...register("todo", {
                    required: "Please Write todo!"
                })}
            />
            <button>Add</button>
        </form>
    );
}

export default CreateTodo;