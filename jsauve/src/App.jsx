import { useState } from 'react'
import { useAsciiText, bloody, ansiShadow, block, alpha, bigMoneySe, chiseled, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, defLeppard } from 'react-ascii-text'
import './App.css'


const fontNames = [
    useAsciiText, bloody, ansiShadow, block, alpha, bigMoneySe, chiseled, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, defLeppard
];


const profile_links = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/jacob-l-sauve-04a099335'},
    {title: 'GitHub', url: 'https://github.com/jacob-sauve'},
    {title: 'Devpost', url: 'https://devpost.com/jacob-sauve'},
];

function AsciiBanner({ msg, animate = false }: { msg: string; animate?: boolean }) {
    const banner = useAsciiText({
        font: fontNames.at(Math.floor(Math.random() * fontNames.length)),
        text: msg,
        isAnimated: animate,
    });

    return (
        <pre ref={banner} />
    );
}

function ProfileLinks() {
    const listItems = profile_links.map(link =>
        <li>
        <a href={link.url}>{link.title}</a>
        </li>
    )
    return (
        <ul>{listItems}</ul>
    );
}


function App() {
    return (
        <>
        <h1>Jacob Sauvé</h1>
        <AsciiBanner msg="test banner" />
        <p>Welcome to my website!</p>
        <ProfileLinks />
        </>
    );
}
export default App
