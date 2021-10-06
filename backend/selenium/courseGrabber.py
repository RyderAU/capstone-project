from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import time

def grabCourseIDs(email, password):

    # Web driver set for the bot to run on. Options to make it 'headless' (run as a background process) is set
    PATH = "./geckodriver"
    settings = Options()
    settings.headless = True # Change to False for testing purposes
    driver = webdriver.Firefox(executable_path=PATH, options=settings)

    # Open the web browser and click the 'Sign On' link 
    driver.get("https://my.unsw.edu.au/")
    link = driver.find_element_by_link_text('Sign On')
    link.click()

    # Click the link to redirect to the UNSW login portal
    link = driver.find_element_by_xpath('//*[@id="current-login"]/div/div/div[2]/div[1]/a')
    link.click()
    time.sleep(1) 

    # Enter email and press next
    field = driver.find_element_by_xpath('//*[@id="i0116"]')
    field.send_keys(email)
    link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
    link.click()
    time.sleep(1)

    # Enter password and press next
    field = driver.find_element_by_xpath('//*[@id="i0118"]')
    field.send_keys(password)
    link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
    link.click()
    time.sleep(1)

    # Click "No" to save password
    link = driver.find_element_by_xpath('//*[@id="idBtn_Back"]')
    link.click()
    time.sleep(1)

    # Click the link to redirect to the student profile page
    link = driver.find_element_by_xpath('//*[@id="pt1:pt_gl3j_id_1"]')
    link.click()
    time.sleep(1)
    
    # Setup list to store student course details
    courseDetails = []

    # Web crawl page and extract courses and degree
    for element in driver.find_elements_by_tag_name('label'):

        # Course extraction
        if(element.text[0:4].isupper() and element.text[4:8].isdigit()):
            courseDetails.append(element.text[0:8])
        
        # Degree extraction
        if(element.text.find("Program") != -1):
            courseDetails.append(element.text)

    # Close the web browser
    driver.close()

    return courseDetails
    
print(grabCourseIDs("z5168024@ad.unsw.edu.au", "password"))