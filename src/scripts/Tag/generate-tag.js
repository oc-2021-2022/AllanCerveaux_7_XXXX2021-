import { recipes } from '../../resources/data/recipes.json';
import { Manipulator } from '../lib/Manipulator';

const manipulator = new Manipulator() 
const $ = (elm) => manipulator.selector(elm)

export const generateTag = (types, arr = recipes) => types
  .forEach(type =>
    $(`#datalist-${type}`)
      .html(
        optionList(type, arr).map(ingredient => /* html */`<option class="${type}" value="${ingredient}">`).join('')
      )
  )


const optionList = (type, arr) => {
  if (type === 'ingredient') {
    const ingredients = arr
      .map(({ ingredients }) => ingredients)
      .flat()
      .map(({ ingredient }) => ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      .sort()
    return ingredients.filter((ingredient, index) => ingredients.indexOf(ingredient) === index)
  }
  else if (type === 'appliance') {
    const appliances = arr
      .map(({ appliance }) => appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      .sort()
    return appliances.filter((appliance, index) => appliances.indexOf(appliance) === index)
  }
  else if (type === 'ustensil') {
    const ustensils = arr
      .map(({ ustensils }) => ustensils)
      .flat()
      .map(ustensil => ustensil)
      .sort()
    return ustensils.filter((ustensil, index) => ustensils.indexOf(ustensil) === index)
  }
}

