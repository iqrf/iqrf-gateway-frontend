
@echo off
set json_dir=..\\api

del ..\\src\\app\\api.d.ts

set "mydir=%~dp0"

cd %json_dir%

for %%a in (*.json) do (
json2ts %%a >> ..\\src\\app\\api.d.ts
)

cd %mydir%