$(function () {
    const links = document.querySelectorAll("span[data-target]");

    [...links].forEach(link => {
        link.addEventListener("mouseover", handleMouseOver);
        link.addEventListener("mousemove", handleMouseMove);
        link.addEventListener("mouseleave", handleMouseLeave);
    });

    function handlePosition(e) {
        const ID = e.target.getAttribute("data-hover-id");
        const wrapper = document.getElementById(ID);
        let top = "";
        if (
            !(e.target.getBoundingClientRect().top + wrapper.offsetHeight > innerHeight)
        ) {
            top = `${e.clientY + e.target.offsetHeight}px`;
        } else {
            top = `${e.clientY - (wrapper.offsetHeight + e.target.offsetHeight)}px`;
        }

        return `position: fixed; left: ${e.clientX -
        wrapper.offsetWidth / 2}px; top:${top}`;
    }

    function handleMouseOver(e) {
        const hoverContent = e.target.getAttribute("data-hover-content");
        const ID = Math.random()
            .toString(36)
            .substr(2, 9);
        const wrapper = document.createElement("DIV");
        e.target.setAttribute("data-hover-id", ID);
        wrapper.setAttribute("data-hover-wrapper", "");
        wrapper.setAttribute("id", ID);
        wrapper.setAttribute("style", "opacity: 0; transform: scale(.8)");
        wrapper.innerHTML = hoverContent;
        document.body.append(wrapper);
        wrapper.setAttribute("style", handlePosition(e));

        // You can remove this line when you are using. I had added for the demo.
        if (document.querySelector('.info')) document.querySelector('.info').remove();

    }

    function handleMouseLeave(e) {
        const ID = e.target.getAttribute("data-hover-id");
        document.getElementById(ID).style.opacity = 0;
        document.getElementById(ID).style.transform = "scale(.8)";
        setTimeout(() => {
            document.getElementById(ID).remove();
        }, 150);
    }

    function handleMouseMove(e) {
        const ID = e.target.getAttribute("data-hover-id");
        const wrapper = document.getElementById(ID);
        wrapper.setAttribute("style", handlePosition(e));
    }

    window.addEventListener('scroll', () => {
        const wrapper = document.querySelector('[data-hover-wrapper]');
        if (wrapper) wrapper.remove();
    });


    $(".post-content span[data-target]").each(function () {
        if ($(this).attr("data-target") == 'kaf') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/kaf.jpg' />
            <p><strong>Kalın Ha</strong>Türkçedeki 'g' harfine benzer.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'ayn') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/ayn.jpg' />
            <p><strong>Ayn</strong>İnce sıfatlı. Okurken kalına yakın bir sesle okunur.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'gayn') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/gayn.jpg' />
            <p><strong>Ğayn</strong>Türkçedeki 'ğ' harfine benzer.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'tı') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/tı.jpg' />
            <p><strong>Tı</strong>Boğazımızı hırıldatarak çıkarırız.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'zı') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/zı.jpg' />
            <p><strong>Zı (Kalın - Peltek)</strong>Boğazımızı hırıldatarak çıkarırız.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'zel') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/zel.jpg' />
            <p><strong>Zel (Peltek)</strong>Boğazımızı hırıldatarak çıkarırız.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'ha') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/ha.jpg' />
            <p><strong>Ha</strong>İnce sıfatlı. Okurken kalına yakın bir sesle okunur.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'k-ha') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/k-ha.jpg' />
            <p><strong>Kalın Ha</strong>Boğazımızı hırıldatarak çıkarırız.</p>
            </div>`)
        }
        if ($(this).attr("data-target") == 'se') {
            $(this).attr("data-hover-content", `<div class='hover-content'>
            <img src='./assets/img/se.jpg' />
            <p><strong>Se (Peltek)</strong>Boğazımızı hırıldatarak çıkarırız.</p>
            </div>`)
        }
    })
});