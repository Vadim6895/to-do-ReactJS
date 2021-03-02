import React, { useState } from 'react';
import List from '../../components/List/List.jsx';
import './AddButtonList.scss';
import Badge from '../../components/Badge/Badge.jsx';
import closeSvg from '../../img/close.svg'

const AddButtonList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(true);
    const [selectedColor, setSelector] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

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
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({"id": Math.random(), "name": inputValue, "color": color });
        onClose();
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
            <button className="button" type="button" onClick={addList}>Добавить</button>
        </div>}
        </div>
    )
};

export default AddButtonList;
