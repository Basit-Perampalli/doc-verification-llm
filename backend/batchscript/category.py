import os
import shutil
import time

if __name__ == "__main__":
    folders = ["gate", "marksheet", "caste", "degree"]
    while True:
        time.sleep(5)
        for folder in folders:
            source_folder = os.path.join("../", folder)
            destination_folder = os.path.join("../", "not_preprocessed")

            for filename in os.listdir(source_folder):
                source_file = os.path.join(source_folder, filename)
                if os.path.isfile(source_file):
                    destination_file = os.path.join(destination_folder, f"{folder}@{filename}")
                    shutil.move(source_file, destination_file)