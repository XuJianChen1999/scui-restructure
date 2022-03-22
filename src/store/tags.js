import {ref} from 'vue'
import {defineStore} from 'pinia'
import {VIEW_TAGS} from '@/utils/constant'

const viewTagsStore = defineStore(VIEW_TAGS, () => {
  const viewTags = ref([])

  function pushViewTags(route) {
    console.log(route)
    let target = viewTags.value.find(item => item.fullPath === route.fullPath)
    let isName = route.name
    if(!target && isName){
      viewTags.value.push(route)
    }
  }

  function removeViewTags(route){
    viewTags.value.forEach((item, index) => {
      if (item.fullPath === route.fullPath){
        viewTags.value.splice(index, 1)
      }
    })
  }

  function updateViewTags(route){
    viewTags.value.forEach(item => {
      if (item.fullPath === route.fullPath){
        item = {...item, ...route}
      }
    })
    console.log('viewTags.value', viewTags.value)
  }

  function updateViewTagsTitle(title = ''){
    const nowFullPath = location.hash.substring(1)
    viewTags.value.forEach(item => {
      if (item.fullPath === nowFullPath){
        item.meta.title = title
      }
    })
  }

  function clearViewTags(){
    viewTags.value = []
  }

  return {
    viewTags,
    pushViewTags, removeViewTags, updateViewTags, updateViewTagsTitle, clearViewTags
  }
})

export default viewTagsStore