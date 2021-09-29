from selenium import webdriver
import time
def grabCourseIDs(email, password):
    PATH = "C:\Program Files (x86)\chromedriver.exe"
    driver = webdriver.Chrome(PATH)
    driver.get("https://my.unsw.edu.au/")
    link = driver.find_element_by_link_text('Sign On')
    link.click()
    link = driver.find_element_by_xpath('//*[@id="current-login"]/div/div/div[2]/div[1]/a')
    link.click()
    time.sleep(5)
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
    for element in driver.find_elements_by_tag_name('label'):
       print (element.text)
    driver.close()