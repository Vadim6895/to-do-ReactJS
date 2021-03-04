import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../../components/List/index.jsx';
import './AddButtonList.scss';
import Badge from '../../components/Badge/index.jsx';
import closeSvg from '../../img/close.svg'



const AddButtonList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelector(colors[0].id)
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue(``);
        setSelector(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert(`Введите название списка`);
            return;
        }

        setIsLoading(true);
        axios
        .post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = { ...data, color: { name: color } };
                onAdd(listObj);
                onClose();
            }).catch(() => {
                alert(`Ошибка при добавлении задачи`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="add-list">
        <List
            onClick={() => {setVisiblePopup(!visiblePopup)}}
            items={[
                {
                    icon: <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1v10M1 6h10" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                    name: 'Добавить список',
                    className: 'list__add-button'
                }
            ]}
        />
        {visiblePopup && <div className="add-list__popup">
            <img src={closeSvg} alt="closeIcon" className="add-list__popup-close-btn"
            onClick={() => onClose()}
            />
            <input value={inputValue} onChange={e => setInputValue(e.target.value)}
                className="field"
                type="text"
                placeholder="Название списка"
            />
            <div className="add-list__popup-colors">
                {colors.map(color =>(
                    <Badge
                        key={color.id}
                        color={color.name}
                        onClick={() => setSelector(color.id)}
                        className={selectedColor === color.id && `active`}/>
                ))}
            </div>
            <button
                className="button"
                type="button"
                onClick={addList}>{isLoading ? 'Добавление...' : 'Добавить'}
            </button>
        </div>}
        </div>
    )
};

export default AddButtonList;
