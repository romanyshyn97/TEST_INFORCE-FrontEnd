import logo from '../../resources/logo.png';

import './AppHeader.scss';

const AppHeader = () => {
    return(
        <div className='center logo-img'>
            <img src={logo} alt="" />
        </div>
    )
}

export default AppHeader;