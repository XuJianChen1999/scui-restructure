import drag from './drag'
import auth from './auth'
import time from './time'
import copy from './copy'
import role from './role'

export default app => {
  app.directive('drag', drag)
  app.directive('auth', auth)
  app.directive('time', time)
  app.directive('copy', copy)
  app.directive('role', role)
}