import { useLayoutEffect, useMemo, useState } from 'react'
import {
    useAsciiText, bloody, ansiShadow, swampLand, bigMoneySe, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, henry3D, ghoulish, fireFontK, diamFont, whimsy
} from 'react-ascii-text'
import './App.css'

const fontNames = [
    bloody, ansiShadow, swampLand, bigMoneySe, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, henry3D, ghoulish, fireFontK, diamFont, whimsy
];


const profile_links = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/jacob-l-sauve-04a099335' },
    { title: 'GitHub', url: 'https://github.com/jacob-sauve' },
    { title: 'Devpost', url: 'https://devpost.com/jacob-sauve' },
];

function getMaxChars(text) {
    if (! text) return 1;
    const lines = text.split("\n");
    return Math.max(1, ...lines.map((line) => line.length));
}

function AsciiBanner({ msg, animate = false, heading }){

    const targetBannerWidth = 85; // in percent of cqw
    const bannerWidth = targetBannerWidth/0.6; // in characters

    // caches calculation until msg is changed
    const pickedFont = fontNames.at(Math.floor(Math.random() * fontNames.length));

    const banner = useAsciiText({
        animationDelay: 2000,
        animationSpeed: 15,
        font: pickedFont,
        text: msg,
        isAnimated: animate,
    });

    const [maxChars, setMaxChars] = useState(() => Math.max(1, msg.length * 8)); // use last cached val or 1 if none

    useLayoutEffect( () => {
        const elem = banner.current;
        if (!elem) return 1; // if empty --> failsafe

        const updateMaxChars = () => {
            setMaxChars(getMaxChars(elem.textContent));
        };

        updateMaxChars();


        const observer = new MutationObserver(updateMaxChars);
        observer.observe(elem, { childList: true, characterData: true, subtree: true });

        return () => observer.disconnect();

    }, [banner, msg, animate]);

    const Tag = heading ? `h${heading}` : 'div';

    return (
        <Tag aria-label={msg} >
            {/*maybe add arg to the min to have it stay at char size of the fully-extended ASCII after first animation run*/}
            <pre ref={banner} style={{ fontFamily: 'monospace', fontSize: `min(16px, ${bannerWidth / maxChars}cqw)` }} aria-hidden="true" />
        </Tag>
    );
}

function ProfileLinks() {
    const listItems = profile_links.map(link =>
        <li key={link.url}>
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
        {/*<h1>Jacob Sauvé</h1>*/}
        <AsciiBanner msg="jacob sauve" animate={true} />
        <p>Welcome to my website!</p>
        <ProfileLinks />
        </>
    );
}
export default App
