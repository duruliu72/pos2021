export const MainJqueyLoad = () => {
    const script = document.createElement('script');
    script.src = "../../../assets/js/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
}
export const nouislider = () => {
    const script = document.createElement('script');
    script.src = "../../../assets/js/nouislider.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
}
export const pageJs = () => {
    const script = document.createElement('script');
    script.src = "../../../assets/js/jquery.dashboard.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
}
