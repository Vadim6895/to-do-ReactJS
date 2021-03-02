import React from 'react';
import './List.scss';
import classNames from 'classnames';
import Badge from '../Badge/Badge.jsx';

import removeSvg from '../../img/remove.svg';

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm(`Вы действительно хотите удалить список ?`)) {
            onRemove(item);
        }
    }

    return (
        <ul className="list" onClick={onClick}>
        {items.map((item, index) => (
            <li className={classNames(item.className, {active: item.active})} key={index + new Date()}>
                <i> {item.icon ? (item.icon) : (<Badge color={item.color}/>)} </i>
                <span>{item.name}</span>
                {isRemovable ?
                    <img src={removeSvg}
                        className="list__remove-icon"
                        alt="remove icon"
                        onClick={() => removeList(item)}
                    /> : ''}
            </li>
        ))}
        </ul>
    );
};

export default List;
