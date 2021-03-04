import React, { useState, useEffect } from 'react';
import { List, AddButtonList, Tasks } from './components';
import axios from 'axios';


function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    const onAddList = (obj) => {
        const newList = [...lists, obj];
        setLists(newList)
    }

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        })
        setLists(newList);
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name =title;
            }
            return item;
        });
        setLists(newList);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
            setLists(data);
        });
        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setColors(data);
        });
    }, [])

    return (
        <div className="todo">
            <div className="todo__sideBar">
                <List
                    items={[
                        {
                            icon: (
                                <svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.96 5.1H5.74c-.5 0-.54.4-.54.9s.04.9.54.9h5.22c.5 0 .54-.4.54-.9s-.04-.9-.54-.9zm1.8 4.5H5.74c-.5 0-.54.4-.54.9s.04.9.54.9h7.02c.5 0 .54-.4.54-.9s-.04-.9-.54-.9zM5.74 2.4h7.02c.5 0 .54-.4.54-.9s-.04-.9-.54-.9H5.74c-.5 0-.54.4-.54.9s.04.9.54.9zM2.86 5.1H1.24c-.5 0-.54.4-.54.9s.04.9.54.9h1.62c.5 0 .54-.4.54-.9s-.04-.9-.54-.9zm0 4.5H1.24c-.5 0-.54.4-.54.9s.04.9.54.9h1.62c.5 0 .54-.4.54-.9s-.04-.9-.54-.9zm0-9H1.24C.74.6.7 1 .7 1.5s.04.9.54.9h1.62c.5 0 .54-.4.54-.9S3.36.6 2.86.6z" fill="#7C7C7C"/></svg>
                            ),
                            name: 'Все задачи',
                            active: true
                        }
                    ]}
                />
                {lists ? (
                <List
                    items={lists}
                    isRemovable
                    onRemove={id => {
                        const newLists = lists.filter(item => item.id !== id);
                        setLists(newLists);
                    }}
                    onClickItem={item => {
                        setActiveItem(item);
                    }}
                    activeItem={activeItem}
                />) : (
                    'Загрузка...'
                )}
                <AddButtonList onAdd={onAddList} colors={colors}/>
            </div>
            <div
                className="todo__tasks">
                {lists && activeItem && <Tasks list={activeItem} onEditTitle={onEditListTitle} onAddTask={onAddTask} />}
            </div>
        </div>
    );
}

export default App;
