import { useLayoutEffect, useMemo, useState, useRef } from 'react'
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

function getQuip() {
    return "this is a test quip";
}

function AsciiBanner({ msg, animate = false, heading }){

    const targetBannerWidth = 85; // in percent of cqw
    const bannerWidth = targetBannerWidth/0.6; // in characters

    // caches calculation until msg is changed
    const pickedFont = useMemo(() => fontNames.at(Math.floor(Math.random() * fontNames.length)), [msg]);

    const banner = useAsciiText({
        animationDelay: 2000,
        animationSpeed: 15,
        font: pickedFont,
        text: msg,
        isAnimated: animate,
    });

    const [maxChars, setMaxChars] = useState(() => Math.max(1, msg.length * 8)); // use last cached val or func output if none

    useLayoutEffect( () => {
        const elem = banner.current;
        if (!elem) return 1; // if empty --> failsafe

        const updateMaxChars = () => {
            if (!elem.textContent?.trim()) return; // failsafe for null or blank string to reduce jitter
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

function Wiggle() {
    /*Shoutout Dave Plant*/
    const wiggleRef = useRef(null);
    function updateWiggle(e) {
        const svgWidth = e.currentTarget.getBoundingClientRect().width; //actual svg width rn
        const mouseX = (e.nativeEvent.offsetX/svgWidth)*1200; // actual mouse position
        const mouseYdirection = e.nativeEvent.movementY > 0 ? 1 : -1;
        if (wiggleRef?.current) {
            // update wiggle if exists
            wiggleRef.current.setAttribute('d', `M -2400 30 L ${mouseX - 20} 30 Q ${mouseX} ${30+20*mouseYdirection} ${mouseX + 20} 30 L 2400 30`);
        }
    }
    return (
        <svg style={{ height: '60px', width: '100vw' }} viewBox="0 0 1200 60" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" onMouseMove={
            (e) => updateWiggle(e)
        }>
        {/*<defs> tag used to hide the path*/}
                <path ref={wiggleRef} id="wiggle-path" d="M -2400 30 Q 0 30 2400 30" stroke="currentColor" fill="none" /> 
        {/*</defs>*/}
            <text fill="currentColor" fontSize="large">
                <textPath href="#wiggle-path" xlinkHref="#wiggle-path">
                    <animate
                    attributeName="startOffset"
                    begin="0s"
                    dur="8s"
                    from="50%"
                    to="100%" />
                    {getQuip()}
                </textPath>
            </text>
            <text fill="currentColor" fontSize="large">
                <textPath href="#wiggle-path" xlinkHref="#wiggle-path">
                    <animate
                    attributeName="startOffset"
                    begin="4s"
                    dur="16s"
                    from="0%"
                    to="100%"
                    repeatCount="indefinite" />
                    {getQuip()}
                </textPath>
            </text>
        </svg>
    );
}

function Foot() {
    /*Shoutout Jérémie Lebel*/
    /*mention author and last mod date [fetched from main]*/
    
}


function App() {
    return (
        <>
        {/*<h1>Jacob Sauvé</h1>*/}
        <AsciiBanner msg="jacob sauve" animate={true} />
        <Wiggle />
        <h2>Welcome to my website!</h2>
        <h3>A couple of useful links...</h3>
        <ProfileLinks />
        </>
    );
}
export default App
