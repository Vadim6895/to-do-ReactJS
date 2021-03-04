import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import './List.scss';
import Badge from '../Badge/index.jsx';
import removeSvg from '../../img/remove.svg';

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm(`Вы действительно хотите удалить список ?`)) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul className="list" onClick={onClick}>
        {items.map((item, index) => (
            <li className={classNames(item.className, {active: item.active ? item.active : activeItem && activeItem.id === item.id})} key={index + new Date()} onClick={onClickItem ? () => onClickItem(item) : null}>
                <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                <span>{item.name}{item.tasks && `(${item.tasks.length})`}</span>
                {isRemovable &&
                    <img src={removeSvg}
                        className="list__remove-icon"
                        alt="remove icon"
                        onClick={() => removeList(item)}
                    />}
            </li>
        ))}
        </ul>
    );
};

export default List;
