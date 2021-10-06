from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time
def grabCourseIDs(email, password):
    PATH = "./geckodriver"
    settings = Options()
    settings.headless = True
    #driver = webdriver.Firefox(executable_path=PATH)
    driver = webdriver.Firefox(executable_path=PATH, options=settings)
    driver.get("https://my.unsw.edu.au/")
    link = driver.find_element_by_link_text('Sign On')
    link.click()
    link = driver.find_element_by_xpath('//*[@id="current-login"]/div/div/div[2]/div[1]/a')
    link.click()
    time.sleep(2)
    field = driver.find_element_by_xpath('//*[@id="i0116"]')
    field.send_keys(email)
    link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
    link.click()
    time.sleep(5)
    field = driver.find_element_by_xpath('//*[@id="i0118"]')
    field.send_keys(password)
    link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
    link.click()
    time.sleep(2)
    link = driver.find_element_by_xpath('//*[@id="idBtn_Back"]')
    link.click()
    time.sleep(2)
    link = driver.find_element_by_xpath('//*[@id="pt1:pt_gl3j_id_1"]')
    link.click()
    time.sleep(2)
    
    courseDetails = []
    for element in driver.find_elements_by_tag_name('label'):

        if(element.text[0:4].isupper() and element.text[4:8].isdigit()):
            courseDetails.append(element.text[0:8])
        
        if(element.text.find("Program") != -1):
            courseDetails.append(element.text)

    driver.close()
  
    return courseDetails
    
print(grabCourseIDs("z5168024@ad.unsw.edu.au", "password"))
