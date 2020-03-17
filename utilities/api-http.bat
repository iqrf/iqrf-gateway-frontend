
@echo off
set json_dir=..\\api_http

del ..\\src\\app\\api_http.d.ts

set "mydir=%~dp0"

cd %json_dir%

for %%a in (*.json) do (
json2ts %%a >> ..\\src\\app\\api_http.d.ts
)

cd %mydir%