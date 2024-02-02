import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export enum Categories {
    "TODO" = "TODO",
    "DOING" = "DOING",
    "DONE" = "DONE",
    "DELETE" = "DELETE",
}

export interface ITodo{
    id: number;
    text: string;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TODO
})

export const todoState = atom<ITodo[]>({
    key: "todo",
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export const todoSelector = selector({
    key: "todoSelector",
    get: ({get}) => {
        const todos = get(todoState);
        const category = get(categoryState);
        return todos.filter(todo => todo.category === category && todo.category !== Categories.DELETE);
    }
})