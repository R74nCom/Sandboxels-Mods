const styleElement = document.createElement('style');
styleElement.innerHTML = `
.tooltip {
    z-index: 1000;
    position: relative;
    flex-grow: 1;
}

.tooltip .tooltiptext {
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    padding: 0.5em;
    position: absolute;
    z-index: 1000;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    text-shadow: none;
    --button-border: #4d4d4d;
}
  
.tooltip:hover .tooltiptext {
    visibility: visible;
    font-variant: normal;
}
    
@keyframes quark {
  0%   {color:#ff0000;}
  33.3%  {color:#00ff00;}
  66.7%  {color:#0000ff;}
  100%  {color:#ff0000;}
}

.quark {
  animation-name: quark;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}
`

document.head.appendChild(styleElement);

runAfterLoad(async () => {
    const data = await fetch('https://mods.r74n.com/mods/chemFormulas.json').then((res) => res.json()); //TODO change
    for (const element in data) {   
        if (elements[element]) {
            elements[element].hoverStat = () => data[element].join(", ").replace(/\<.*?\>/g, "");
            if (document.querySelector(`button[element='${element}']`)) {
                const div = document.createElement('div');
                div?.classList.add('tooltip');
                const button = document.querySelector(`button[element='${element}']`);
                button?.replaceWith(div);
                div.appendChild(button);
                const span = document.createElement('span');
                span.classList.add('tooltiptext','elementButton');
                span.innerHTML = data[element].join("<br>");
                div?.appendChild(span);
            }
        }
    }
});