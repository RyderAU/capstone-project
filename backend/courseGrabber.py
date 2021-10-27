from selenium import webdriver
from selenium.webdriver.firefox.options import Options
#from selenium.webdriver.chrome.options import Options
import time

def grabCourseDetails(driver):
    userDetails = {}
    courses = []
    startCourseGrab = False
    stopCourseGrab = False

    for element in driver.find_elements_by_tag_name('label'):

        # Course extraction
        if(element.text[0:4].isupper() and element.text[4:8].isdigit() and startCourseGrab == True and stopCourseGrab == False):
            courses.append(element.text[0:8])
        
        # Degree extraction
        if(element.text.find("Program: ") != -1):
            userDetails['degree'] = element.text

        if(element.text.find("Term") != -1 and element.text.find("Complete") == -1):
           
            if (startCourseGrab == False):
                startCourseGrab = True
            
            # Another term
            else:
               stopCourseGrab = True

    userDetails['courses'] = courses

    nameElement = driver.find_element_by_xpath('//*[@id="pt1:pt_pgl23"]')
    userDetails['name'] = nameElement.text[13:]

    return userDetails

def grabCourseIDs(email, password):
    start_time = time.time()
    # Web driver set for the bot to run on. Options to make it 'headless' (run as a background process) is set
    PATH = "./geckodriver"
    #PATH = "./chromedriver"
    settings = Options()
    settings.headless = False # Change to False for testing purposes
    driver = webdriver.Firefox(executable_path=PATH, options=settings)
    #driver = webdriver.Chrome(executable_path=PATH, options=settings)

    # Open the web browser and click the 'Sign On' link 
    driver.get("https://my.unsw.edu.au/")
    try:
        link = driver.find_element_by_link_text('Sign On')
        link.click()
    except: 
        print("Network Retry A")
        time.sleep(5)
        link = driver.find_element_by_link_text('Sign On')
        link.click()

    # Click the link to redirect to the UNSW login portal
    try:
        link = driver.find_element_by_xpath('//*[@id="current-login"]/div/div/div[2]/div[1]/a')
        link.click()
    except:
        print("Network Retry B")
        time.sleep(5)
        link = driver.find_element_by_xpath('//*[@id="current-login"]/div/div/div[2]/div[1]/a')
        link.click()
    
    time.sleep(1) 

    # Enter email and press next
    try:
        field = driver.find_element_by_xpath('//*[@id="i0116"]')
        field.send_keys(email)
        link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
        link.click()
    except:
        print("Network Retry C")
        time.sleep(5)
        field = driver.find_element_by_xpath('//*[@id="i0116"]')
        field.clear()
        field.send_keys(email)
        link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
        link.click()
    
    time.sleep(1)

    # Enter password and press next
    try:
        field = driver.find_element_by_xpath('//*[@id="i0118"]')
        field.send_keys(password)
        link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
        link.click()
    except:
        print("Network Retry D")
        time.sleep(5)
        field = driver.find_element_by_xpath('//*[@id="i0118"]')
        field.clear()
        field.send_keys(password)
        link = driver.find_element_by_xpath('//*[@id="idSIButton9"]')
        link.click()

    time.sleep(1)

    # Click "No" to save password
    try:
        link = driver.find_element_by_xpath('//*[@id="idBtn_Back"]')
        link.click()
    except:
        print("Network Retry E")
        time.sleep(5)
        link = driver.find_element_by_xpath('//*[@id="idBtn_Back"]')
        link.click()

    time.sleep(1)

    # Click the link to redirect to the student profile page
    try:
        link = driver.find_element_by_xpath('//*[@id="pt1:pt_gl3j_id_1"]')
        link.click()
    except:
        print("Network Retry F")
        time.sleep(5)
        link = driver.find_element_by_xpath('//*[@id="pt1:pt_gl3j_id_1"]')
        link.click()

    time.sleep(1)
    
    # Web crawl page and extract courses and degree
    try:
        userDetails = grabCourseDetails(driver)
        userDetails['zID'] = email[0:8]
        link = driver.find_element_by_xpath('//*[@id="pt1:j_id__ctru9"]/div[13]/a')
        link.click()
    except:
        print("Network Retry G")
        time.sleep(5)
        userDetails = grabCourseDetails(driver)
        userDetails['zID'] = email[0:8]
        link = driver.find_element_by_xpath('//*[@id="pt1:j_id__ctru9"]/div[13]/a')
        link.click()
    
    time.sleep(1)
    timetables = []

    for x in range(0, 10):
        try:
            timetableElement = driver.find_element_by_xpath('//*[@id="calendar"]/div[2]')
            timetables.append(timetableElement.get_attribute("outerHTML"))
            button = driver.find_element_by_xpath('//*[@id="calendar"]/div[1]/div[2]/div/button[2]')
            button.click()                         

        except:
            print("Network Retry H")
            time.sleep(5)
            timetableElement = driver.find_element_by_xpath('//*[@id="calendar"]/div[2]')
            timetables.append(timetableElement.get_attribute("outerHTML"))
            button = driver.find_element_by_xpath('//*[@id="calendar"]/div[1]/div[2]/div/button[2]')
            button.click()
        
        time.sleep(1)

    userDetails['timetables'] = timetables
    print(userDetails)
    print(len(timetables))
    time.sleep(5)
    # Close the web browser
    driver.close()
    print("--- %s seconds ---" % (time.time() - start_time))
    return userDetails
