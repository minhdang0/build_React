import { Children, useEffect, useRef, useState } from 'react'
import Tab from './Tab';


const Tabs = ({ defaultIndex = 0, children, onChange }) => {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const tabs = Children.toArray(children);
    const preIndex = useRef(defaultIndex);

    useEffect(() => {
        tabs.forEach((tab) => {
            if (tab.type !== Tab) throw Error("Only <Tabs> Only Changes<Tab> elements as its children")
        })
    }, [])

    useEffect(() => {
        if (preIndex.current !== currentIndex && typeof onChange === "function") {
            onChange(currentIndex);
        }

        preIndex.current = currentIndex;
    }, [currentIndex, onChange])
    return (
        <div className='wrapper'>
            <div className="tabs__list">
                {tabs.map((tab, index) => {
                    const active = currentIndex === index;
                    return <button
                        key={index}
                        style={{ color: active ? "red" : "black", fontWeight: active ? "bold" : "400" }}
                        onClick={() => {
                            setCurrentIndex(index);
                            if (typeof tab.props.onClick === "function") tab.props.onClick();
                        }}
                    >
                        {tab.props.title}
                    </button>
                })}
            </div>
            <div className="content__tab">
                {tabs[currentIndex]}
            </div>
        </div>
    )
}

export default Tabs
