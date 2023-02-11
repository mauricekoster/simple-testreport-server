from fastapi import APIRouter, Depends, HTTPException
from fastapi import UploadFile, Request
from typing import Union, List

from app.core.config import settings
from pathlib import Path

router = APIRouter()


@router.get("/apps")
def get_applications():
    output_path = Path(settings.DATA_PATH)
    if not output_path.exists():
        raise HTTPException(
            400, f"DATA_PATH '{settings.DATA_PATH}' does not exists")

    p = []
    for folder in output_path.iterdir():
        if folder.is_dir():
            p.append(folder.name)
    return {
        "applications": p
    }



@router.get("/apps")
def get_applications():
    output_path = Path(settings.DATA_PATH)
    if not output_path.exists():
        raise HTTPException(
            400, f"DATA_PATH '{settings.DATA_PATH}' does not exists")

    p = []
    for folder in output_path.iterdir():
        if folder.is_dir():
            p.append(folder.name)
    return {
        "applications": p
    }


# Save the uploaded file to the correct sub folder
async def save_file(appl, component, version, testtype, file):
    output_path = Path(settings.DATA_PATH)
    if not output_path.exists():
        raise HTTPException(
            400, f"DATA_PATH '{settings.DATA_PATH}' does not exists")

    contents = await file.read()
    p = output_path / appl / component / version / testtype

    p.mkdir(parents=True, exist_ok=True)
    fn = p / file.filename
    print(fn)

    with open(fn, 'wb') as f:
        f.write(contents)

    return fn


# Handle POST to upload multiple files
@router.post("/upload/{appl}/component/{component}/version/{version}/testtype/{testtype}")
async def upload_files(appl: str,
                       component: str,
                       version: str,
                       testtype: str,
                       files: List[UploadFile],
                       request: Request
                       ):

    fns = []
    urls = {}
    h = str(request.base_url)
    # Store the uploaded files
    for file in files:
        # Store file
        fn = await save_file(appl, component, version, testtype, file)
        # Add info of the document (location and url)
        fns.append(fn)
        urls[file.filename] = f'{h}reports/{appl}/{component}/{version}/{testtype}/{file.filename}'

    # Return Json object containing info on stored files and the Url to retrieve the documents from the store
    return {
        "application": appl,
        "component": component,
        "version": version,
        "testtype": testtype,
        "filenames": fns,
        "urls": urls
    }
