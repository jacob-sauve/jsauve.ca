import { useState } from 'react'
import './App.css'


const profile_links = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/jacob-l-sauve-04a099335'},
    {title: 'GitHub', url: 'https://github.com/jacob-sauve'},
    {title: 'Devpost', url: 'https://devpost.com/jacob-sauve'},
];

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
        <p>Welcome to my website!</p>
        <ProfileLinks />
        </>
    );
}
export default App
