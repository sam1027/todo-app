import { useRecoilState, useRecoilValue} from 'recoil';
import { Categories, categoryState, todoSelector, todoState } from '../atoms';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

function ToDoList() {
    const todos = useRecoilValue(todoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        setCategory(value as any);
    };
    console.log(category)
    return (
        <div>
            <h1>ToDos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TODO}>{Categories.TODO}</option>
                <option value={Categories.DOING}>{Categories.DOING}</option>
                <option value={Categories.DONE}>{Categories.DONE}</option>
            </select>
            <CreateTodo />
            {todos.map(todo => <Todo key={todo.id} {...todo} />)}
        </div>
    );
}

export default ToDoList;