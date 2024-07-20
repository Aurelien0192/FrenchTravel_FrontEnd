export class FormularServices{
    static showError(name:string){
        const input = document.getElementsByName(name)
            if(input[0]){
                const inputClasseNameDefault:string = input[0].className
                input[0].className = `${input[0].className} errorInit`
                setTimeout(()=> {
                    input[0].className = `${input[0].className} errorTransition `
                },500)
                setTimeout(()=>{
                    input[0].className = inputClasseNameDefault
                    console.log(input[0].className)
                },3000)
            }
        }
}