import { useLayoutEffect, useMemo, useState, useRef } from 'react';
import { useSpring, animated, to, config } from '@react-spring/web';
import {
    useAsciiText, bloody, ansiShadow, swampLand, bigMoneySe, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, henry3D, ghoulish, fireFontK, diamFont, whimsy
} from 'react-ascii-text';
import './App.css';

const fontNames = [
    bloody, ansiShadow, swampLand, bigMoneySe, ghost, dancingFont, crawford2, diamond, dietCola, dosRebel, henry3D, ghoulish, fireFontK, diamFont, whimsy
];

const profile_links = [
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/jacob-l-sauve-04a099335' },
    { title: 'GitHub', url: 'https://github.com/jacob-sauve' },
    { title: 'Devpost', url: 'https://devpost.com/jacob-sauve' },
];

const quipList = [
    "Twelve hours on the clock, except in Venice",
    " Oh what I'd give right about now for a block of aged cheese...",
    "Named 'best website on the Internet' by its creator upon release",
    "𐃅-----𐂂-𐂂-𐂂-𐂂-𐂂 ",
];


function getMaxChars(text) {
    if (! text) return 1;
    const lines = text.split("\n");
    return Math.max(1, ...lines.map((line) => line.length));
}

function getQuip() {
    return quipList.at(Math.floor(Math.random() * quipList.length));
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
    // springy animation for strumming
    const [{x, y}, api] = useSpring(() => ({
        x: 600,
        y: 30,
        config: { tension: 320, friction: 5 },
    }));

    // for d generation during spring animation
    const d = to([x, y], (currX, currY) => `M -2400 30 L ${currX - 150} 30 Q ${currX} ${currY} ${currX + 150} 30 L 2400 30`);

    function updateWiggle(e) {
        const svgWidth = e.currentTarget.getBoundingClientRect().width; //actual svg width rn
        const mouseX = (e.nativeEvent.offsetX/svgWidth)*1200; // actual mouse position
        const mouseYdirection = e.nativeEvent.movementY > 0 ? 1 : -1;
        // update wiggle twang if needed
        api.start({
            from: { x: mouseX, y: 30 + 20*mouseYdirection},
            to: { y: 30 }, // x doesn't change
            config: config.wobbly,
        });
    }
    return (
        <svg style={{ height: '60px', width: '100vw' }} viewBox="0 0 1200 60" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" onMouseMove={
            (e) => updateWiggle(e)
        }>
        {/*<defs> tag used to hide the path*/}
            <animated.path id="wiggle-path" d={d} stroke="currentColor" fill="none" /> 
        {/*</defs>*/}
            <text fill="currentColor" fontSize="large">
                <textPath href="#wiggle-path" xlinkHref="#wiggle-path">
                    <animate
                    attributeName="startOffset"
                    begin="0s"
                    dur="10s"
                    from="50%"
                    to="100%"
                    />
                    {getQuip()}
                </textPath>
            </text>
            <text fill="currentColor" fontSize="large">
                <textPath href="#wiggle-path" xlinkHref="#wiggle-path">
                    <animate
                    attributeName="startOffset"
                    begin="10s"
                    dur="20s"
                    from="0%"
                    to="100%"
                    repeatCount="indefinite" />
                    {getQuip()}
                </textPath>
            </text>
                <text fill="currentColor" fontSize="large">
                <textPath href="#wiggle-path" xlinkHref="#wiggle-path">
                    <animate
                    attributeName="startOffset"
                    begin="20s"
                    dur="20s"
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
