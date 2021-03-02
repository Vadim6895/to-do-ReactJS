import List from './components/List/List.jsx';
import React, { useState } from 'react';
import AddButtonList from './components/AddButtonList/AddButtonList.jsx'
import Tasks from './components/tasks/tasks.jsx'

import mock from './mock.json'

function App() {
    let listsWithColors = mock.lists.map(item => {
        item.color = mock.colors.filter(color => color.id === item.colorId)[0].name;
        return item;
    })
    const [lists, setLists] = useState(listsWithColors);

    const onAddList = (obj) => {
        const newList = [...lists, obj];
        setLists(newList)
    }

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
                <List
                    items={lists}
                    isRemovable
                    onRemove={(list) => {}}
                />
                <AddButtonList onAdd={onAddList} colors={mock.colors}/>
            </div>
            <Tasks />
        </div>
    );
}

export default App;



/*
[
    {
        color: 'green',
        name: 'Покупки',
        active: true
    },
    {
        color: 'blue',
        name: 'Фронтенд'
    },
    {
        color: 'yellow',
        name: `Задачи`
    }
]
*/
