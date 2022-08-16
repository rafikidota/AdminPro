export interface Menu{
    title:string,
    icon:string,
    submenu:SubMenu[]
}
export interface SubMenu{
    title:string,
    url:string
}