import { freehandDraw } from "../Algorithms/freehandDraw";
const cache = {};

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}

const images = importAll(require.context('../assets/algo_icons', true, /\.(png|svg|jpg|jpeg|gif|ico)$/));
// console.log(cache);



export default function runAPP()
{
  console.log(cache);

  const toolBar = document.querySelector('#tools-nav');
  const paintTools = toolBar.querySelector('#paint-tools');

  
  for(const element of Object.keys(cache))
  {
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.classList.add(`${element.replace(/^\.\/|\.svg$/g, '')}`);
    img.src = cache[element];
    li.appendChild(img);
    paintTools.appendChild(li);

    li.addEventListener('click', (e)=>
    {
      freehandDraw();
    })
  }

} 