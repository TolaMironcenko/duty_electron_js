const change_theme = (checked) => {
    // console.log(checked);
    if (checked) {
        document.body.setAttribute('dark', '');
        theme = 'dark'
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('dark');
        theme = 'white';
        localStorage.setItem('theme', 'white');
    }
}

theme_checkbox.addEventListener("change", (e) => change_theme(e.target.checked))