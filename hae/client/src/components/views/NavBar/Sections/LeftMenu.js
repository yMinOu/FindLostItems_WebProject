// import React from 'react';
// import { Menu } from 'antd';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
 

// function LeftMenu(props){

//   return (
//       <div style={{display: 'flex'}}> 
      
//           <div>
//           <Menu mode={props.mode}>
//           <SubMenu title={<span>품목 </span>}>
           
          
//               <Menu.Item key="setting:1"> <a href="/ww">학생증</a></Menu.Item>
//               <Menu.Item key="setting:2"><a href="/card">신용카드</a></Menu.Item>
        
//               <Menu.Item key="setting:3"><a href="/card">운전면허증</a></Menu.Item>
//               <Menu.Item key="setting:4"><a href="/card">주민등록증</a></Menu.Item>

//           </SubMenu>

//         </Menu>
//         </div>


//         <div style={{padding:'23px'}}>
//             <a href="/NoticePage">공지사항</a>

//         </div>
//   </div>
    


//   )

// }

// export default LeftMenu
// import { Menu, Dropdown, Icon } from 'antd';

// const { SubMenu } = Menu;

// const menu = (
//   <Menu>
//     <Menu.Item>1st menu item</Menu.Item>
//     <Menu.Item>2nd menu item</Menu.Item>
//     <SubMenu title="sub menu">
//       <Menu.Item>3rd menu item</Menu.Item>
//       <Menu.Item>4th menu item</Menu.Item>
//     </SubMenu>
//     <SubMenu title="disabled sub menu" disabled>
//       <Menu.Item>5d menu item</Menu.Item>
//       <Menu.Item>6th menu item</Menu.Item>
//     </SubMenu>
//   </Menu>
// );

// ReactDOM.render(
//   <Dropdown overlay={menu}>
//     <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//       Cascading menu <Icon type="down" />
//     </a>
//   </Dropdown>,
//   mountNode,
// );

import { Menu, Dropdown, Icon } from 'antd';
import React from 'react'

function LeftMenu() {

  const { SubMenu } = Menu;

const menu = (
  <Menu>
    
    <SubMenu title="카드">
      <Menu.Item><a href="/studentIDcard">학생증</a></Menu.Item>
      <Menu.Item><a href="/creditCard">신용_체크카드</a></Menu.Item>
      <Menu.Item><a href="/ssn">주민등록증</a></Menu.Item>
      <Menu.Item><a href="/driversLicense">운전면허증</a></Menu.Item>

    </SubMenu>
    <Menu.Item><a href="/earphones">이어폰</a></Menu.Item>
    <Menu.Item><a href="/wallet">지갑</a></Menu.Item>

    <Menu.Item><a href="/tumbler">텀블러</a></Menu.Item>
    <Menu.Item><a href="/cosmetics">화장품</a></Menu.Item>
    <Menu.Item><a href="/etc">기타</a></Menu.Item>


   
  </Menu>
);


  return (
    <div style={{padding : '20px 0 0 0' }}>
       <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          품목 <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  )
}

export default LeftMenu