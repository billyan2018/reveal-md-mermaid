mermaid.initialize({
    startOnLoad: false,
    logLevel: 3,
});

Reveal.on('ready', event => {
	console.log('asyncMermaidRender');
    const graphs = document.getElementsByClassName('mermaid');
    graphs.forEach((item, index) => {
		// already proceeded
		if (item.getElementsByTagName('svg') && item.getElementsByTagName('svg').length > 0) {
			return;
		}
        const graphCode = item.innerText.trim();
        const mermaidDiv = document.createElement('div');
        mermaidDiv.classList.add('mermaid');
        mermaidDiv.setAttribute('data-processed', 'true');

        try {
            // item.innerText ignores html elements added by revealjs highlight plugin.
            mermaid.mermaidAPI.render('theGraph' + index, graphCode, function(svgCode) {
                mermaidDiv.innerHTML = svgCode;
            });

            let parentDiv = document.createElement('div');
            parentDiv.appendChild(mermaidDiv);
            item.parentNode.parentNode.insertBefore(parentDiv, item.parentNode);
            item.parentNode.remove();
        }
        catch(err) {
            console.error('Cannot render mermaid diagram ', err.message);
        }
    });
});
