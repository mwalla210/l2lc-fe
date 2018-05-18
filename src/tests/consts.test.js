import Consts from '../consts'

const THIRTYONE = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const THIRTYONEEMAIL = 'aaa@aaaaaaaaaaaaaaaaaaaaaaaaa.aaaa'
const FIFTYWEBSITE = 'www.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaa'
const HUNDRED = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

describe('Consts', () => {
  it ('Tests customerFields', () => {
    let response = Consts.customerFields
    expect(response).toHaveLength(17)
    expect(typeof response[0].validation('',true)).toBe('string')
    expect(typeof response[0].validation(THIRTYONE,true)).toBe('string')
    expect(response[0].validation('a',true)).toBeNull()
    expect(typeof response[1].validation('',true)).toBe('string')
    expect(typeof response[1].validation('a',true)).toBe('string')
    expect(typeof response[1].validation(THIRTYONEEMAIL,true)).toBe('string')
    expect(response[1].validation('ca@ca.ca',true)).toBeNull()
    expect(typeof response[2].validation('',true)).toBe('string')
    expect(typeof response[2].validation('y',true)).toBe('string')
    expect(response[2].validation('777777777777',true)).toBeNull()
    expect(typeof response[3].validation('',true)).toBe('string')
    expect(typeof response[3].validation('y',true)).toBe('string')
    expect(typeof response[3].validation(FIFTYWEBSITE,true)).toBe('string')
    expect(response[3].validation('www.a.com',true)).toBeNull()
    expect(typeof response[4].validation('',true)).toBe('string')
    expect(response[4].validation('w',true)).toBeNull()
    expect(response[4].onUpdate('United States of America')).toHaveLength(2)
    expect(response[4].onUpdate('Canada')).toHaveLength(2)
    expect(typeof response[5].validation('',true)).toBe('string')
    expect(typeof response[5].validation(THIRTYONE,true)).toBe('string')
    expect(response[5].validation('a',true)).toBeNull()
    expect(typeof response[6].validation('',true)).toBe('string')
    expect(typeof response[6].validation(THIRTYONE,true)).toBe('string')
    expect(response[6].validation('a',true)).toBeNull()
    expect(typeof response[7].validation('',true)).toBe('string')
    expect(typeof response[7].validation(THIRTYONE,true)).toBe('string')
    expect(response[7].validation('a',true)).toBeNull()
    expect(typeof response[8].validation('',true)).toBe('string')
    expect(response[8].validation('w',true)).toBeNull()
    expect(typeof response[9].validation('',true)).toBe('string')
    expect(typeof response[9].validation(THIRTYONE,true)).toBe('string')
    expect(response[9].validation('w',true)).toBeNull()
    expect(response[10].onUpdate(true)).toHaveLength(6)
    expect(response[10].onUpdate(false, [
      {id: 'billCountry', value: 'United States of America'}
    ])).toHaveLength(6)
    expect(response[10].onUpdate(false, [
      {id: 'billCountry', value: 'Canada'}
    ])).toHaveLength(6)
    expect(response[10].onUpdate(false, [{id: 'billCountry', value: 'Other'}])).toHaveLength(6)
    expect(typeof response[11].validation('',true)).toBe('string')
    expect(response[11].validation('w',true)).toBeNull()
    expect(response[11].onUpdate('United States of America')).toHaveLength(5)
    expect(response[11].onUpdate('Canada')).toHaveLength(5)
    expect(typeof response[12].validation('',true)).toBe('string')
    expect(typeof response[12].validation(THIRTYONE,true)).toBe('string')
    expect(response[12].validation('a',true)).toBeNull()
    expect(typeof response[13].validation('',true)).toBe('string')
    expect(typeof response[13].validation(THIRTYONE,true)).toBe('string')
    expect(response[13].validation('a',true)).toBeNull()
    expect(typeof response[14].validation('',true)).toBe('string')
    expect(typeof response[14].validation(THIRTYONE,true)).toBe('string')
    expect(response[14].validation('a',true)).toBeNull()
    expect(typeof response[15].validation('',true)).toBe('string')
    expect(response[15].validation('w',true)).toBeNull()
    expect(typeof response[16].validation('',true)).toBe('string')
    expect(typeof response[16].validation(THIRTYONE,true)).toBe('string')
    expect(response[16].validation('w',true)).toBeNull()
  })
  it ('Tests projectFields', () => {
    let response = Consts.projectFields
    expect(response).toHaveLength(7)
    expect(typeof response[0].validation('',true)).toBe('string')
    expect(response[0].validation('w',true)).toBeNull()
    expect(response[0].onUpdate('APC')).toHaveLength(6)
    expect(response[0].onUpdate('Decorative')).toHaveLength(6)
    expect(response[0].onUpdate('Maintenance')).toHaveLength(6)
    expect(response[0].onUpdate('Administration')).toHaveLength(6)
    expect(response[0].onUpdate('Research and Development')).toHaveLength(6)
    expect(response[0].onUpdate('Military')).toHaveLength(6)
    expect(response[0].onUpdate('Production')).toHaveLength(6)
    expect(response[0].onUpdate('Other')).toHaveLength(6)
    expect(response[0].onUpdate('A')).toHaveLength(6)
    expect(typeof response[1].validation('',true)).toBe('string')
    expect(response[1].validation('w',true)).toBeNull()
    expect(response[1].onUpdate('Pump')).toHaveLength(1)
    expect(response[1].onUpdate('A')).toHaveLength(1)
    expect(typeof response[2].validation('',true)).toBe('string')
    expect(typeof response[2].validation('a',true)).toBe('string')
    expect(typeof response[2].validation(HUNDRED,true)).toBe('string')
    expect(typeof response[2].validation('5555555555555555555555555555',true)).toBe('string')
    expect(response[2].validation('4',true)).toBeNull()
    expect(typeof response[3].validation('',true)).toBe('string')
    expect(typeof response[3].validation(HUNDRED,true)).toBe('string')
    expect(response[3].validation('a',true)).toBeNull()
    expect(typeof response[4].validation('',true)).toBe('string')
    expect(response[4].validation('a',true)).toBeNull()
    expect(typeof response[4].validation(THIRTYONE,true)).toBe('object')
    expect(typeof response[5].validation('',true)).toBe('string')
    expect(typeof response[5].validation(HUNDRED,true)).toBe('string')
    expect(response[5].validation('a',true)).toBeNull()
    expect(typeof response[6].validation('',true)).toBe('string')
    expect(typeof response[6].validation(THIRTYONE,true)).toBe('string')
    expect(response[6].validation('a',true)).toBeNull()
  })
  it ('Tests employeeFields', () => {
    let response = Consts.employeeFields
    expect(response).toHaveLength(2)
    expect(typeof response[0].validation('',true)).toBe('string')
    expect(typeof response[0].validation(THIRTYONE,true)).toBe('string')
    expect(response[0].validation('4',true)).toBeNull()
    expect(typeof response[1].validation('',true)).toBe('string')
    expect(typeof response[1].validation(THIRTYONE,true)).toBe('string')
    expect(response[1].validation('4',true)).toBeNull()
  })
  it ('Tests accountFields', () => {
    let response = Consts.accountFields
    expect(response).toHaveLength(3)
    expect(typeof response[0].validation('',true)).toBe('string')
    expect(typeof response[0].validation(THIRTYONE,true)).toBe('string')
    expect(response[0].validation('4',true)).toBeNull()
    expect(typeof response[1].validation('',true)).toBe('string')
    expect(typeof response[1].validation(THIRTYONE,true)).toBe('string')
    expect(response[1].validation('4',true)).toBeNull()
  })
  it ('Tests taskFields', () => {
    let response = Consts.taskFields
    expect(response).toHaveLength(2)
    expect(typeof response[0].validation('',true)).toBe('string')
    expect(typeof response[0].validation(THIRTYONE,true)).toBe('string')
    expect(response[0].validation('4',true)).toBeNull()
    expect(typeof response[1].validation('',true)).toBe('string')
    expect(response[1].validation('4',true)).toBeNull()
  })
  it ('Tests doneColor', () => {
    let response = Consts.doneColor
    expect(response).toHaveLength(7)
    expect(response).toBe('#49a4ff')
  })
  it ('Tests helpColor', () => {
    let response = Consts.helpColor
    expect(response).toHaveLength(7)
    expect(response).toBe('#ffbf00')
  })
  it ('Tests openColor', () => {
    let response = Consts.openColor
    expect(response).toHaveLength(7)
    expect(response).toBe('#57d500')
  })
  it ('Tests pieColors', () => {
    let response = Consts.pieColors
    expect(response).toHaveLength(15)
    expect(response).toEqual(["rgba(96,146,204,1)", "rgba(150,182,68,1)", "rgba(139,103,209,1)", "rgba(210,155,61,1)", "rgba(86,118,209,1)", "rgba(205,88,57,1)", "rgba(72,183,188,1)", "rgba(210,66,115,1)", "rgba(86,174,111,1)", "rgba(200,89,183,1)", "rgba(130,136,68,1)", "rgba(204,158,223,1)", "rgba(189,124,88,1)", "rgba(149,95,149,1)", "rgba(210,118,140,1)"])
  })
  it ('Tests barBGColorByIndex', () => {
    let index = 0
    let response = Consts.barBGColorByIndex(index)
    expect(response).toEqual("rgba(96,146,204,0.6)")
  })
  it ('Tests barBorColorByIndex', () => {
    let response = Consts.barBorColorByIndex
    expect(response).toHaveLength(1)
    expect(typeof response).toBe('function')
  })
  it ('Tests barHovColorByIndex', () => {
    let response = Consts.barHovColorByIndex
    expect(response).toHaveLength(1)
    expect(typeof response).toBe('function')
  })
  it ('Tests summaryProps', () => {
    let response = Consts.summaryProps
    expect(response).toEqual({"className": "col-3", "style": {"border": "1px solid #b4b4b4", "borderRadius": "8px", "margin": "2px", "paddingTop": "1rem"}})
  })
  it ('Tests pistonTasks', () => {
    let response = Consts.pistonTasks
    expect(response).toHaveLength(12)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Bake Clean"}, {"required": true, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Alodine"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": true, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": true, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests turboTasks', () => {
    let response = Consts.turboTasks
    expect(response).toHaveLength(12)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Bake Clean"}, {"required": true, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Alodine"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": false, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": false, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests pumpTasks', () => {
    let response = Consts.pumpTasks
    expect(response).toHaveLength(13)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "EPK Bake"}, {"required": false, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Paint Pen"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Bonderite"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": true, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": false, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests rotorTasks', () => {
    let response = Consts.rotorTasks
    expect(response).toHaveLength(12)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Bake Clean"}, {"required": true, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Alodine"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": true, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": false, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests specialtyTasks', () => {
    let response = Consts.specialtyTasks
    expect(response).toHaveLength(14)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Bake Clean"}, {"required": true, "station": "Preparation", "title": "EPK Bake"}, {"required": false, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Paint Pen"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Alodine"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": true, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": true, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests decorativeTasks', () => {
    let response = Consts.decorativeTasks
    expect(response).toHaveLength(8)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Strip"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Big Blaster", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Decorative Coating", "title": "Prime"}, {"required": true, "station": "Decorative Coating", "title": "Paint"}, {"required": true, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests avaslickTasks', () => {
    let response = Consts.avaslickTasks
    expect(response).toHaveLength(12)
    expect(typeof response).toBe('object')
    expect(response).toEqual([{"required": true, "station": "Preparation", "title": "Degrease"}, {"required": true, "station": "Preparation", "title": "Bake Clean"}, {"required": true, "station": "Preparation", "title": "Engrave"}, {"required": true, "station": "Preparation", "title": "Mask"}, {"required": true, "station": "Preparation", "title": "Blast"}, {"required": true, "station": "Preparation", "title": "Wash - Alodine"}, {"required": true, "station": "Coating", "title": "Mask"}, {"required": true, "station": "Coating", "title": "Measure"}, {"required": true, "station": "Coating", "title": "Probe Zero"}, {"required": true, "station": "Coating", "title": "Coat"}, {"required": true, "station": "Coating", "title": "Cure"}, {"required": true, "station": "Packaging", "title": "QC Check"}])
  })
  it ('Tests stationName', () => {
    let name = 'bigblas'
    let response = Consts.stationName(name)
    expect(response).toHaveLength(11)
    expect(typeof response).toBe('string')
    expect(response).toBe('Big Blaster')
  })
  it('Tests get calculateTime', () => {
    let timeEntries = [{created: 'December 17, 1995 03:00:00'}, {created: 'December 17, 1995 03:45:00'}, {created: 'December 17, 1995 04:24:00'}, {created: 'December 17, 1995 04:55:00'}]
    let response = Consts.calculateTime(timeEntries)
    expect(typeof response).toBe('object')
    expect(response).toEqual({"hour": 1, "min": 16})
  })
})
