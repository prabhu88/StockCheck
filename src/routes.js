/*
 * Copyright (c) 2023 S. Prabhu (s.prabhu.mtech88@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import Dashboard from './views/dashboard'
import BuyMeCoffee from './views/buyMeCoffee';
import AddClient from './views/addclient';
import EditClient from './views/editclient';
const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  // {
  //   path: "/New-Client",
  //   name: "Add-Client",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: AddClient,
  //   layout: "/admin"
  // },
  {
    path: "/Clients",
    name: "Client",
    icon: "nc-icon nc-chart-pie-35",
    component: EditClient,
    layout: "/admin"
  },
  {
    path: "/Buy-Me-a-Coffee",
    name: "Want to thank me?",
    icon: "nc-icon nc-bell-55",
    component: BuyMeCoffee,
    layout: "/admin"
  }
]
export default routes;