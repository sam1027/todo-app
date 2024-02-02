import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../atoms";

function Todo({text, category, id}: ITodo) {
    const setTodos = useSetRecoilState(todoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name: newCategory}} = event;
        setTodos(oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newTodo = {text, id, category: newCategory as any};
            return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TODO && <button name={Categories.TODO} onClick={onClick}>{Categories.TODO}</button>}
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>{Categories.DOING}</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>{Categories.DONE}</button>}
        </li>
    );
}

export default Todo;